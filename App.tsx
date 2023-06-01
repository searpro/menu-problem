import * as React from 'react';
import './style.css';

export default function App() {
  return (
    <div>
      React -- Lifting state up use case.
      <UserList />
    </div>
  );
}

const UserList = () => {
  const [users, setUsers] = React.useState([]);
  const [mouseIsOver, setMouseIsOver] = React.useState(false)

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const onMouseEnter = (e) => {
    setMouseIsOver(true);
  }

  const onMouseLeave = (e) => {
    setMouseIsOver(false); 
  }

  return (
    <div>
      <h1>User List</h1>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {users.map((user) => (
          <UserRow mouseIsOver={mouseIsOver} user={user} key={user.id}>
            {/* <li style={{ padding: "10px", background: "#fafafa", margin: "3px"}} key={user.id}>
              {user.name} - {user.email}
            </li> */}
          </UserRow>
        ))}
      </div >
    </div>
  );
};

const UserRow = (props) => {

  const [hover, setHover] = React.useState(false);

  const rowStyle = {
    position: 'relative',
    background: hover ? '#fff' : '#fafafa',
    padding: '10px',
    border: '1px solid black',
    marginBottom: '10px',
    cursor: 'pointer'
  }

  const onMouseEnter = (e) => {
    setHover(true);
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  return (
    <div style={rowStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Menu mouseIsOver={props.mouseIsOver} company={props.user.company} hover={hover} />
      {props.user.name}
    </div>
  )
};

const Menu = (props) =>{
  const {mouseIsOver, company, hover} = props;
  const [visible, setVisible] = React.useState(true); 
  
  const menuStyle = {
    opacity: hover ? '1' : '0',
    right: 10,
    position: 'absolute',
    padding: '10px',
    background: '#fff',
    border: '1px solid black',
    zIndex: '100',
    transition: !mouseIsOver ? 'all 1s' : 'none'
  }

  // Problem. 
  // Instead of simply using the CSS display Property, figure out a way to toggle the display of the 
  // menu while keeping the animations as it is. 
  // i.e. If the mouse leaves the user list container, slowly hide, 
  // if the mouse moves to one user to another, quickly show the menu for the other user. 
  // make sure the Menu is not present in the DOM if mouse is not over the user. 

  return hover && mouseIsOver &&(
    <div style={menuStyle}>
      <small>Company:</small>
      <h5>{company.name}</h5>
      <p>{company.catchPhrase}</p>
    </div>
  )
}
