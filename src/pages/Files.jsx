import { Filemanager } from "@svar-ui/react-filemanager";
import "@svar-ui/react-filemanager/all.css";
import { Willow } from "@svar-ui/react-filemanager";
import { dispatchDesktopEvent } from "../utils/eventBus";
import { useState } from 'react';
import "../css/FileExplorer.css";
  

const rawdata = [
  {
    name: "Desktop",
    id: "/Desktop",
    size: 4096,
    date: new Date(2023, 11, 2, 17, 25),
    type: "folder",
  },
  {
    name: "Documents",
    id: "/Documents",
    size: 4096,
    date: new Date(2023, 11, 1, 14, 45),
    type: "folder",
  },
  {
    name: "Folder",
    id: "/Documents/Folder",
    size: 4096,
    date: new Date(2025, 11, 1, 14, 45),
    type: "folder",
  },
  {
    name: "Downloads",
    id: "/Downloads",
    size: 4096,
    date: new Date(2025, 11, 1, 14, 45),
    type: "folder",
  },
  {
    name: "Music",
    id: "/Music",
    size: 4096,
    date: new Date(2023, 11, 2, 17, 25),
    type: "folder",
  },
  {
    name: "Pictures",
    id: "/Pictures",
    size: 4096,
    date: new Date(2023, 11, 1, 14, 45),
    type: "folder",
  },
  {
    name: "Cat Photos",
    id: "/Pictures/Cat Photos",
    size: 4096,
    date: new Date(2025, 11, 1, 14, 45),
    type: "folder",
  },
  {
    name: "Videos",
    id: "/Videos",
    size: 4096,
    date: new Date(2025, 11, 1, 14, 45),
    type: "folder",
  },

  {
    name: "Boring Document.txt",
    id: "/Documents/Boring Document.txt",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
    content: "This is a very boring document.",
  },
  {
    name: "Example Text File.txt",
    id: "/Documents/Example Text File.txt",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
    content: "This is an example text file.",
  },
  {
    name: "Secret Document.txt",
    id: "/Documents/Folder/Secret Document.txt",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
    content: "This is a secret document!",
  },
  {
    name: "Photo.png",
    id: "/Downloads/Photo.png",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    name: "Document.txt",
    id: "/Downloads/Document.txt",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
    content: "This is a document in the Downloads folder.",
  },
  {
    name: "BirdsChirping.mp3",
    id: "/Music/BirdsChirping.mp3",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    name: "CatPic.png",
    id: "/Pictures/Cat Photos/CatPic.png",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    name: "Photo.png",
    id: "/Pictures/Photo.png",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    name: "RickRoll.mp4",
    id: "/Videos/RickRoll.mp4",
    size: 1595,
    date: new Date(2023, 11, 7, 15, 23),
    type: "file",
  },
];

// Refer to for help with file manager:
// https://docs.svar.dev/react/filemanager/api/overview/api_overview
function Files() {
  const [mode, setMode] = useState("table")
  return (
    <div className="files-wrapper">
      <select
        className="files-mode-select"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="table">Table</option>
        <option value="cards">Cards</option>
        <option value="panels">Panels</option>
      </select>
      <Willow>
        <Filemanager
          data={rawdata}
          init={(api) => {
            // console.log("Filemanager API ready", api);
            api.on("set-path", ({ id, panel }) => {
              if (!id) return;
              const dispatchName = "FileExplorer" + id.replace(/\W/g, "") + "Clicked";
              dispatchDesktopEvent(dispatchName, { id, panel });
              api.intercept("create-file", ({ file, parent }) => {
                dispatchDesktopEvent("FileExplorerNewFolderCreated");
              });
            });

            api.on("open-file", ({ id }) => {
              if (!id) return;
              const file = rawdata.find(f => f.id === id);
              if (!file?.name) return;

              if (file.name.endsWith(".txt") || id.endsWith(".txt")) {
                dispatchDesktopEvent("OpenTextFile", { file });
              }
            });
          }}
          mode={mode}
        />
      </Willow>
    </div>
  );
}

export default Files;