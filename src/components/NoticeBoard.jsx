import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { toast } from 'react-toastify'; // ✅ Toast import

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notices'), (snapshot) => {
      const noticesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(noticesData.sort((a, b) => b.timestamp - a.timestamp));
    });

    return () => unsubscribe();
  }, []);

  const handleAddNotice = async () => {
    if (!newNotice.trim()) return;
    await addDoc(collection(db, 'notices'), {
      text: newNotice,
      timestamp: serverTimestamp(),
    });
    setNewNotice('');
    toast.success("📢 Notice added successfully!"); // ✅ Toast
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'notices', id));
    toast.info("🗑️ Notice deleted."); // ✅ Toast
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = async () => {
    const noticeRef = doc(db, 'notices', editingId);
    await updateDoc(noticeRef, {
      text: editText,
      timestamp: serverTimestamp(),
    });
    setEditingId(null);
    setEditText('');
    toast.success("✏️ Notice updated."); // ✅ Toast
  };

  return (
    <div className="block-card">
      <h2>📢 Notice Board</h2>
      <textarea
        placeholder="Write a new notice..."
        value={newNotice}
        onChange={(e) => setNewNotice(e.target.value)}
      />
      <button onClick={handleAddNotice}>Add Notice</button>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            {editingId === notice.id ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {notice.text}
                <button onClick={() => handleEdit(notice.id, notice.text)}>Edit</button>
                <button onClick={() => handleDelete(notice.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
