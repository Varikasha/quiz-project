"use client";
import "./index.css";
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import QuizIcon from '@mui/icons-material/Quiz';

const Animation = ({type}) => {
    return (
        <div className={"animation"}>
            {type === "add" && <AddToQueueIcon color="success" fontSize="large"/>}
            {type === "edit" && <DriveFileRenameOutlineIcon color="primary" fontSize="large"/>}
            {type === "remove" && <DeleteIcon color="error" fontSize="large"/>}
            {type === "settings" && <SettingsIcon fontSize="large"/>}
            {type === "student" && <SchoolIcon color="warning" fontSize="large"/>}
            {type === "teacher" && <FolderSharedIcon color="primary" fontSize="large"/>}
            {type === "quizzes" && <QuizIcon color="success" fontSize="large"/>}
        </div>
    );
};

export default Animation;