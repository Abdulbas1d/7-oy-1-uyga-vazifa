import React, { useEffect, useState } from 'react';
import './App.css';
import LogoPicture from './assets/images/logo-picture.svg';
import LogoSearchPicture from './assets/images/logo-search-picture.svg';
import LogoButtonPicture from './assets/images/logo-button-picture.svg';
import PointPicture from './assets/images/point.svg';
import DeletePicture from './assets/images/delete.svg';
import PencilPicture from './assets/images/pensil.svg';

function App() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [rate, setRate] = useState("");
  const [balance, setBalance] = useState("");
  const [deposit, setDeposit] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState("active");
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let getLocalStorage = localStorage.getItem('users');
    if (getLocalStorage) {
      setData(JSON.parse(getLocalStorage));
    }
  }, []);

  function validate() {
    if (!name) {
      alert("Please Enter your name!");
      return false;
    }

    if (name.length < 3) {
      alert("Name must be at least 3 characters long!");
      return false;
    }

    if (!tel) {
      alert("Please Enter your tel!");
      return false;
    }

    if (tel.length < 5) {
      alert("Tel must be at least 5 characters long!");
      return false;
    }

    if (!rate) {
      alert("Please Enter rate!");
      return false;
    }

    if (!balance) {
      alert("Please Enter balance!");
      return false;
    }

    if (!deposit) {
      alert("Please Enter deposit!");
      return false;
    }

    if (!description) {
      alert("Please Enter description!");
      return false;
    }

    if (checked !== 'active' && checked !== 'inactive') {
      alert("Please Choose status!");
      return false;
    }

    return true;
  }

  function handleAddUser(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    let user = {
      id: Date.now(),
      name: name,
      tel: tel,
      rate: rate,
      balance: balance,
      deposit: deposit,
      description: description,
      checked: checked,
    };

    let newData = [...data, user];
    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));

    setName("");
    setTel("");
    setRate("");
    setBalance("");
    setDeposit("");
    setDescription("");
    setChecked("active");

    setModalOpen(false);
  }

  function openModal() {
    setModalOpen(true);
  }

  function handleDelete(id) {
    const newData = data.filter((card) => card.id !== id);
    let isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      setData(newData);
      localStorage.setItem('users', JSON.stringify(newData));
    }
  }

  return (
    <div className='container'>
      <div className="logo">
        <img src={LogoPicture} alt="Logo" />
        <label htmlFor="search">
          <img src={LogoSearchPicture} alt="Search" />
          <input id='search' type="text" placeholder='Search' />
        </label>
        <button className='btnOne' onClick={openModal}>
          <img src={LogoButtonPicture} alt="Add Button" />
          <span>Add Customer</span>
        </button>
        <div className="example">
          <input type="checkbox" />
          <h4 className='name'>NAME</h4>
          <h4 className='desc'>DESCRIPTION</h4>
          <h4 className='rate'>RATE</h4>
          <h4 className='balance'>BALANCE</h4>
          <h4 className='deposit'>DEPOSIT</h4>
          <h4 className='status'>STATUS</h4>
          <h4 className='infor'>...</h4>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <dialog className="modal">
          <form className="form" onSubmit={handleAddUser}>
            <h2>Add User</h2>
            <label htmlFor="name">Enter name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} id='name' type="text" placeholder='Enter name...' />

            <label htmlFor="tel">Enter number</label>
            <input value={tel} onChange={(e) => setTel(e.target.value)} type="number" id="tel" placeholder='Enter number...' />

            <label htmlFor="rate">Enter rate</label>
            <input value={rate} onChange={(e) => setRate(e.target.value)} type="number" id="rate" placeholder='Enter rate...' />

            <label htmlFor="balance">Enter balance</label>
            <input value={balance} onChange={(e) => setBalance(e.target.value)} type="number" id="balance" placeholder='Enter balance...' />

            <label htmlFor="deposit">Enter deposit</label>
            <input value={deposit} onChange={(e) => setDeposit(e.target.value)} type="number" id="deposit" placeholder='Enter deposit...' />

            <label htmlFor="desc">Enter description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="desc" placeholder='Enter description...'></textarea>

            <div className="form-control">
              <label htmlFor="active" className="active">
                <input value="active" checked={checked === 'active'} onChange={() => setChecked('active')} type="radio" name="status" id="active" />
                <span>Active</span>
              </label>

              <label htmlFor="inactive" className="inactive">
                <input value='inactive' checked={checked === 'inactive'} onChange={() => setChecked('inactive')} type="radio" name="status" id="inactive" />
                <span>Inactive</span>
              </label>
            </div>
            <button type="submit" className="btn">Add User</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn">Cancel</button>
          </form>
        </dialog>
      )}

      <div className="cards">
        {data && data.map((value) => (
          <div key={value.id} className="card">
            <input type="checkbox" />
            <h4 className='name'> {value.name} <span> {value.tel} </span></h4>
            <h4 className='desc'> {value.description} </h4>
            <h4 className='rate'> {value.rate} .00 <span>INR</span></h4>
            <h4 className='balance' style={{ color: parseFloat(value.balance) < 0 ? 'red' : 'green' }}>
              {parseFloat(value.balance).toFixed(2)} .00 <span>INR</span>
            </h4>
            <h4 className='deposit'> {value.deposit} .00 <span>INR</span></h4>
            {value.checked === 'active' ? (
              <button className='active'>Active</button>
            ) : (
              <button className='inactive'>Inactive</button>
            )}
            <div className="images">
              <img className='one' src={PencilPicture} alt="Edit" />
              <button onClick={() => handleDelete(value.id)}><img className='two' src={DeletePicture} alt="Delete" /></button>
              <img className='three' src={PointPicture} alt="Options" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
