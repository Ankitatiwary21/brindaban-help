import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify'; // ✅ Toast import

const SuggestionsBox = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'suggestions'), (snapshot) => {
      const suggestionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuggestions(suggestionsData.sort((a, b) => b.timestamp - a.timestamp));
    });

    return () => unsubscribe();
  }, []);

  const handleAddSuggestion = async () => {
    if (!newSuggestion.trim()) {
      toast.error('Please write something before submitting!');
      return;
    }
    try {
      await addDoc(collection(db, 'suggestions'), {
        text: newSuggestion,
        timestamp: serverTimestamp(),
      });
      setNewSuggestion('');
      toast.success('Suggestion submitted!');
    } catch (error) {
      toast.error('Failed to submit suggestion.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'suggestions', id));
      toast.info('Suggestion deleted.');
    } catch (error) {
      toast.error('Failed to delete suggestion.');
    }
  };

  return (
    <div className="block-card">
      <h2>💡 Suggestions Box</h2>
      <textarea
        placeholder="Write a suggestion..."
        value={newSuggestion}
        onChange={(e) => setNewSuggestion(e.target.value)}
      />
      <button onClick={handleAddSuggestion}>Submit</button>
      <ul>
        {suggestions.map((sugg) => (
          <li key={sugg.id}>
            {sugg.text}
            <button onClick={() => handleDelete(sugg.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsBox;
