import React from 'react';


const GroupsForm = ({ handleSubmit, handleChange, data }) => {
  return(
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="groupName">Group Name</label>
        <input className="input" type="groupName" name="groupName" placeholder="Group Name" onChange={handleChange}
          value={data.groupName || ''} />
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

      <button className="button">Submit Group</button>
    </form>
  );
};

export default GroupsForm;
