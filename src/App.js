import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [id, setId] = useState(-1);
	const [listNames, setListNames] = useState([]);
	const [status, setStatus] = useState('add');

	const handleSave = () => {
		if (status === 'add') {
			setListNames([
				...listNames,
				{ id: uuidv4(), firstName, lastName },
			]);
		} else if (status === 'edit') {
			const editName = listNames.find((name) => name.id === id);
			setListNames(
				listNames.map((name) => {
					if (name.id === editName.id) {
						return {
							id,
							firstName,
							lastName,
						};
					}
					return name;
				})
			);
		}

		setFirstName('');
		setLastName('');
		setStatus('add');
	};

	const handleEdit = (val) => {
		const { id, firstName, lastName } = val;
		setFirstName(firstName);
		setLastName(lastName);
		setId(id);
		setStatus('edit');
	};

	const handleDelete = (id) => {
		setListNames(
			listNames.filter((name) => {
				return name.id !== id;
			})
		);

		setStatus('add');
		setFirstName('');
		setLastName('');
		setId(-1);
	};

	return (
		<div>
			<div>
				<div>{status}</div>
				<label>first name</label>
				<input
					type='text'
					value={firstName}
					onChange={(e) => {
						const { value } = e.target;
						setFirstName(value);
					}}
				/>
			</div>
			<div>
				<label>last name</label>
				<input
					type='text'
					value={lastName}
					onChange={(e) => {
						const { value } = e.target;
						setLastName(value);
					}}
				/>
			</div>
			<button onClick={handleSave}>Save</button>
			<br />
			<br />
			<br />
			<ul>
				{listNames.map((name) => (
					<li key={name.id}>
						{`${name.id} ${name.firstName} ${name.lastName}`}{' '}
						<button onClick={() => handleDelete(name.id)}>
							Delete
						</button>{' '}
						<button onClick={() => handleEdit(name)}>
							Edit
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
