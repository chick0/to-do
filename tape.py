from sys import argv
from glob import glob
from zipfile import ZipFile
from zipfile import ZIP_DEFLATED
from subprocess import run
from subprocess import CalledProcessError


def get_files() -> list:
    return [
        x for x in glob("./dist/**", recursive=True)
    ]


def tape():
    try:
        commit_hash = argv[1][:7]
    except IndexError:
        commit_hash = None

    if commit_hash is None:
        try:
            commit_hash = run(
                "git rev-parse --short HEAD",
                capture_output=True,
                timeout=1,
                check=True
            ).stdout.decode().strip()
        except (FileNotFoundError, CalledProcessError):
            commit_hash = "undefined"

    files = get_files()

    print("total files:", len(files))

    with ZipFile(
        file=f"dist-{commit_hash}.zip",
        mode="w",
        compression=ZIP_DEFLATED,
        compresslevel=9
    ) as zip:
        for file in files:
            print(" +", file), zip.write(file)


if __name__ == "__main__":
    tape()
