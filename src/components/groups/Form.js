import React from 'react';


const GroupsForm = ({ handleSubmit, handleChange, data }) => {
  return(
    <div className="columns form-page">
      <div className="column">
        <section className="container form-section">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="groupName">Group Name</label>
              <input className="input" name="groupName" placeholder="Group Name" onChange={handleChange}
                value={data.groupName || ''} />
              {/* {data.errors.groupName && <small>{data.errors.groupName}</small>} */}
            </div>
            <div className="field">
              <label className="image">Image</label>
              <input className="input" name="image" placeholder="Image" onChange={handleChange}
                value={data.image || ''}/>
            </div>
            <div className="field">
              <label className="info">Group Info</label>
              <textarea className="input" name="info" placeholder="Group Info" onChange={handleChange}
                value={data.info || ''}/>
            </div>
            <div className="field">
              <label className="label">Group Privacy</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="public" onChange={handleChange} value={data.public || ''}>
                    <option value="" disabled>Please choose</option>
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="button form-button">Submit Group</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default GroupsForm;
