import React, { useState } from 'react';
import styles from "./TagsForm.module.scss";
import DeleteIcon from "../../assets/icon_delete.svg";

interface Tag {
  id: string;
  name: string;
}

interface TagsFormProps {
  tagsList: Tag[];
  removeItem: (id: string) => void;
  addItem: (id: string) => void;
  closeForm: (bool: boolean) => void;
}

const TagsForm: React.FC<TagsFormProps> = ({ tagsList, removeItem, addItem, closeForm }) => {
  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const [newTag, setNewTag]=useState("");

  const addNewTag=()=>{
    addItem(newTag);
  }

  const handleClose=(bool:boolean)=>{
    closeForm(bool)
  }

  return (
    <div className={styles.tagsContainer}>
      <div className={styles.tagsHeader}>
        <div className={styles.tagsHeaderItem} onClick={()=>handleClose(false)}>Close</div>
        <div className={styles.tagsHeaderItem}>Tag Suppliers</div>
        <div className={styles.tagsHeaderItem} onClick={()=>addNewTag()}>Save</div>
      </div>
      <input value={newTag} onChange={(e)=>setNewTag(e.target.value)} className={styles.tagsInput} placeholder="Add tags here" />
      <div className={styles.tagsList}>
        {tagsList.map(item => (
          <div key={item.id} className={styles.tagsListItem}>
            <span className={styles.tagsListItemText} >{item.name}</span>
            <div className={styles.deleteButton} onClick={() => handleRemove(item.id)}><img src={DeleteIcon} alt="Delete" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsForm;
