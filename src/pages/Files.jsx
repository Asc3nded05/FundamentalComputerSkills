import { Filemanager } from "@svar-ui/react-filemanager";
import "@svar-ui/react-filemanager/all.css";
import { Willow } from "@svar-ui/react-filemanager";


const rawdata = [
  {
    id: "/Desktop",
    size: 4096,
    date: new Date(2023, 11, 2, 17, 25),
    type: "folder",
  },
  {
    id: "/Documents",
    size: 4096,
    date: new Date(2023, 11, 1, 14, 45),
    type: "folder",
  },
    {
      id: "/Documents/Folder",
      size: 4096,
      date: new Date(2025, 11, 1, 14, 45),
      type: "folder",
    },
  {
    id: "/Downloads",
    size: 4096,
    date: new Date(2025, 11, 1, 14, 45),
    type: "folder",
  },
  {
    id: "/Music",
    size: 4096,
    date: new Date(2023, 11, 2, 17, 25),
    type: "folder",
  },
  {
    id: "/Pictures",
    size: 4096,
    date: new Date(2023, 11, 1, 14, 45),
    type: "folder",
  },
    {
      id: "/Pictures/Cat Photos",
      size: 4096,
      date: new Date(2025, 11, 1, 14, 45),
      type: "folder",
    },
  {
    id: "/Videos",
    size: 4096,
    date: new Date(2025, 11, 1, 14, 45),
    type: "folder",
  },

  {
    id: "/Documents/Boring Document",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    id: "/Documents/Example Text File",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    id: "/Documents/Folder/Secret Document",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    id: "/Downloads/Photo.png",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    id: "/Downloads/Document.txt",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    id: "/Music/BirdsChirping.mp3",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    id: "/Pictures/Cat Photos/CatPic.png",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    id: "/Pictures/Photo.png",
    size: 510885,
    date: new Date(2023, 11, 1, 14, 45),
    type: "file",
  },
  {
    id: "/Videos/RickRoll.mp4",
    size: 1595,
    date: new Date(2023, 11, 7, 15, 23),
    type: "file",
  },
];

// Refer to for help with file manager:
// https://docs.svar.dev/react/filemanager/api/overview/api_overview
function Files() {
  return <>
    <Willow>
      <Filemanager data={rawdata} />
    </Willow>
  </>;
}

export default Files;