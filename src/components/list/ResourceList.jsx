import React, { useState } from 'react';

const ResourceList = ({ headerText, data, getData, createResource }) => {
  const [newResource, setNewResource] = useState('')

  const createNewResource = (e) => {
    e.preventDefault()

    createResource(
      {
        label: newResource
      }
    ).then(() => {
      setNewResource("")
      getData()
    })
  }
  return (
    <div className="container">
      <div className="section">
        <h1 className="title">{headerText}</h1>
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="box">
              {
                data.map((item) => (
                  <div key={item.id} className="notification">
                    {item.label}
                  </div>
                ))
              }
            </div>
          </div>
          <div className="column is-one-third">
            <form onSubmit={createNewResource} className="box">
              <label className="label">Create new {headerText}</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder={`Enter new ${headerText === "Tags" ? "tag" : "category"}...`}
                  value={newResource}
                  onChange={({ target: { value } }) => { setNewResource(value) }}
                  required
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-primary mt-3">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceList;

