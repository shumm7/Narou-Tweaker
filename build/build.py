import shutil, glob
import os
import datetime
from utils.json import JSON

def notice(type: str, msg: str):
    now = datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S')
    print(f"[{now}] <{type}> {msg}")

def create_source(type: str, codeDir: str):
    notice(type, f"Build started. type: {type}")
    srcDir = "app/"

    # Remove Files
    if(os.path.exists(codeDir)):
        shutil.rmtree(codeDir)
        notice(type, f"Removed old files.")

    # Make Directories
    os.makedirs(codeDir, exist_ok=True)

    # Copy Files
    shutil.copytree(srcDir, codeDir, dirs_exist_ok=True)
    notice(type, f"Copied from source: {srcDir}")


def get_manifest(codeDir: str):
    notice("general", f"Read {codeDir}manifest.json")
    m = JSON.read(codeDir + "manifest.json")
    if(m.get("manifest_version")==None):
        raise FileNotFoundError
    else:
        return m

def set_manifest(codeDir: str, manifest: dict):
    JSON.save(codeDir + "manifest.json", manifest)
    notice("general", f"Saved {codeDir}manifest.json")

def replaceText(codeDir, before, after):
    def replaceWordsInFile(fileName, before, after):
        with open(fileName, encoding="utf-8") as f:
            notice("general", f"Replaced text on {fileName}: {before} => {after}")
            data_lines = f.read()

        data_lines = data_lines.replace(before, after)

        with open(fileName, mode="w", encoding="utf-8") as f:
            f.write(data_lines)
    
    for current_dir, sub_dirs, files_list in os.walk(codeDir): 
        for file_name in files_list: 
            ext = os.path.splitext(file_name)[1].lower()
            if(not current_dir.startswith(f"{codeDir}libs") or current_dir.startswith(f"{codeDir}libs\\font-awesome")):
                if(ext==".js" or ext==".css"):
                    replaceWordsInFile(os.path.join(current_dir,file_name), before, after)

def removeDebugMode(codeDir):
    with open(codeDir + "debug_mode.js", 'w', encoding='utf-8') as f:
        f.write("export const debug = false")

def getPatchnote(codeDir):
    patchnote = JSON.read("patchnote.json")
    manifest = get_manifest(codeDir)

    # Find Patchnote
    version = manifest.get("version")
    db: dict
    for data in patchnote["data"]:
        if(data["version"] == version):
            db = data
            break

    if(db==None):
        raise IndexError
    
    return db

def makePatchnoteMarkdown(codeDir):
    headerList = {
        "narou": "🏡 小説家になろう",
        "novel": "📗 小説ページ",
        "workspace": "🖊️ ユーザホーム",
        "mypage": "👤 ユーザページ",
        "yomou": "👑 小説を読もう！",
        "mitemin": "🎨 みてみん",
        "kasasagi": "📊 KASASAGI",
        "general": "⚒️ 全般"
    }
    lang = "ja"

    text = ""
    patchnote = getPatchnote(codeDir)["patchnote"]["ja"]
    for headerKey, header in headerList.items():
        if(headerKey in patchnote):
            text += f"**{header}**\n"
            for line in patchnote[headerKey]:
                text += f"- {line}\n"
            text += "\n"
    
    return text

def makePatchnoteHTML(codeDir):
    headerList = {
        "narou": "🏡 小説家になろう",
        "novel": "📗 小説ページ",
        "workspace": "🖊️ ユーザホーム",
        "mypage": "👤 ユーザページ",
        "yomou": "👑 小説を読もう！",
        "mitemin": "🎨 みてみん",
        "kasasagi": "📊 KASASAGI",
        "general": "⚒️ 全般"
    }
    lang = "ja"

    text = ""
    patchnote = getPatchnote(codeDir)["patchnote"]["ja"]
    for headerKey, header in headerList.items():
        if(headerKey in patchnote):
            text += f"<b>{header}</b>\n<ul>\n"
            for line in patchnote[headerKey]:
                text += f"<li>{line}</li>\n"
            text += "</ul>\n\n"
    
    return text



def init():
    for p in glob.glob('dist/*.zip', recursive=True):
        if os.path.isfile(p):
            os.remove(p)
    for p in glob.glob('dist/*.txt', recursive=True):
        if os.path.isfile(p):
            os.remove(p)

def build_chrome():
    type = "chrome"

    # Make Source
    codeDir = "dist/chrome/"
    create_source(type, codeDir)

    # Manifest
    manifest = get_manifest(codeDir)
    version = manifest["version"]

    # Remove Debug
    removeDebugMode(codeDir)

    # Make Zip
    notice(type, f"Freezing files.")
    shutil.make_archive(f'dist/narou-tweaker-{type}-{version}', 'zip', root_dir=codeDir)

    notice(type, f"Build finished! => 'dist/narou-tweaker-{type}-{version}.zip'")

    # Generate Patchnote
    try:
        patchnoteFilename = "release_markdown.txt"
        patchnote = makePatchnoteMarkdown(codeDir)
        with open("dist/" + patchnoteFilename, 'w', encoding='utf-8') as f:
            f.write(patchnote)
        notice(type, f"Generated release note (Markdown): dist/{patchnoteFilename}'")
    except Exception as e:
        notice(type, f"Failed to generate release note (Markdown). ({e})'")
        pass


def build_gecko():
    type = "gecko"

    # Make Source
    codeDir = "dist/gecko/"
    create_source(type, codeDir)

    # Replace Text
    replaceText(codeDir, "chrome.", "browser.")
    replaceText(codeDir, "chrome-extension:", "moz-extension:")

    # Manifest
    manifest = get_manifest(codeDir)
    version = manifest["version"]

    service_worker = manifest["background"]["service_worker"]
    manifest["background"].pop("service_worker")
    manifest["background"]["scripts"] = [service_worker]

    manifest["browser_specific_settings"] = {
        "gecko": { "id": "{29c0c2f1-2092-4808-9709-6aa5fb8562d7}" }
    }
    manifest.pop("side_panel")
    if("contextMenus" in manifest["permissions"]):
        manifest["permissions"].remove("contextMenus")
    if("sidePanel" in manifest["permissions"]):
        manifest["permissions"].remove("sidePanel")
    set_manifest(codeDir, manifest)

    # Remove Debug
    removeDebugMode(codeDir)

    # Remove Files
    if(os.path.exists(codeDir+"cogs/sidepanel")):
        shutil.rmtree(codeDir+"cogs/sidepanel")
        notice(type, f"Removed old files.")


    # Make Zip
    notice(type, f"Freezing files.")
    shutil.make_archive(f'dist/narou-tweaker-{type}-{version}', 'zip', root_dir=codeDir)

    notice(type, f"Build finished! => 'dist/narou-tweaker-{type}-{version}.zip'")

    # Generate Patchnote
    try:
        patchnoteFilename = "release_html.txt"
        patchnote = makePatchnoteHTML(codeDir)
        with open("dist/" + patchnoteFilename, 'w', encoding='utf-8') as f:
            f.write(patchnote)
        notice(type, f"Generated release note (HTML): dist/{patchnoteFilename}'")
    except Exception as e:
        notice(type, f"Failed to generate release note (HTML). ({e})'")
        pass



init()
build_chrome()
build_gecko()