import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const BlocksList = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'blocks'), (snapshot) => {
      const blocksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlocks(blocksData);
    });

    return () => unsubscribe();
  }, []);

  const handleWaterLevelChange = async (blockId, value) => {
    const blockRef = doc(db, 'blocks', blockId);
    await updateDoc(blockRef, { waterLevel: value });
  };

  const handleServiceChange = async (blockId, field, value) => {
    const blockRef = doc(db, 'blocks', blockId);
    await updateDoc(blockRef, { [field]: value });
  };

  return (
    <div>
      <h2>🏢 Colony Blocks & Apartments</h2>
      {blocks.map((block) => (
        <div key={block.id} className="block-card">
          <h3>{block.name}</h3>

          <p>💧 Water Level: {block.waterLevel}</p>
          <select
            value={block.waterLevel}
            onChange={(e) => handleWaterLevelChange(block.id, e.target.value)}
          >
            <option value="Full">Full</option>
            <option value="Half">Half</option>
            <option value="Low">Low</option>
            <option value="Empty">Empty</option>
          </select>

          <p>🛠️ AC Repair: {block.ac}</p>
          <select
            value={block.ac}
            onChange={(e) => handleServiceChange(block.id, 'ac', e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>

          <p>🔧 Plumber: {block.plumber}</p>
          <select
            value={block.plumber}
            onChange={(e) => handleServiceChange(block.id, 'plumber', e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>

          <p>⚡ Electrician: {block.electrician}</p>
          <select
            value={block.electrician}
            onChange={(e) => handleServiceChange(block.id, 'electrician', e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>

          <h4 style={{ marginTop: '1rem' }}>🏠 Apartments</h4>
          <ul>
            {[...Array(10)].map((_, i) => (
              <li key={i}>Apartment {i + 1}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BlocksList;
