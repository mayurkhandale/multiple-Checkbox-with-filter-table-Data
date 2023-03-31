import React, { useState, useEffect } from 'react';
import './style.css';
// https://jsonplaceholder.typicode.com/posts
export default function App() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((Response) => Response.json())
      .then((data) => {
        setproducts(data);
      });
  }, []);
  console.log(products, '10');

  const [selected, setSelected] = useState([]);
  const [filteredData, setFilteredData] = useState(products);

  const handleChange = (status) => {
    let updatedStatus = [...selected];
    const index = updatedStatus.indexOf(status);
    if (index === -1) {
      updatedStatus.push(status);
    } else {
      updatedStatus.splice(index, 1);
    }
    setSelected(updatedStatus);
  };

  useEffect(() => {
    let newData = products;
    if (selected.length > 0) {
      newData = products.filter((item) => selected.includes(item.status));
    }
    setFilteredData(newData);
  }, [selected]);

  useEffect(() => {
    let newData = products;
    if (selected.length > 0) {
      newData = products.filter(
        (item) =>
          selected.includes(item.username) || selected.includes(item.name)
      );
    }
    setFilteredData(newData);
  }, [products, selected]);

  return (
    <div>
      <div className="d-flex">
        <label>
          <input
            type="checkbox"
            value="Bret"
            onChange={() => handleChange('Bret')}
          />
          Bret
        </label>
        <label>
          <input
            type="checkbox"
            value="Delphine"
            onChange={() => handleChange('Delphine')}
          />
          Delphine
        </label>
        <label>
          <input
            type="checkbox"
            value="Ervin Howell"
            onChange={() => handleChange('Ervin Howell')}
          />
          Ervin Howell
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>User Name</td>
            <td>Phone</td>
            <td>Website</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((photo) => {
            return (
              <tr key={photo.id}>
                <td>{photo.id}</td>
                <td>{photo.name}</td>
                <td>{photo.username}</td>
                <td>{photo.phone}</td>
                <td>{photo.website}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
