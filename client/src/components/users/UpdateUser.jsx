// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// const UpdateUser = () => {
//   const { id } = useParams();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [age, setAge] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:3001/getUser/${id}`)
//       .then(result => {
//         const user = result.data;
//         setName(user.name);
//         setEmail(user.email);
//         setAge(user.age);
//         console.log(user); // To see the data in the console
//       })
//       .catch(err => console.log(err));
//   }, [id]);
//   const updateuser = (e) => {
//     e.preventDefault();
//     axios.put(`http://localhost:3001/updateUser/${id}`, { name, email, age })
//       .then(result =>{ 
//         console.log(result)
//          navigate('/')
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div>
     
//       <h1>update user</h1>
//       <form onSubmit={updateuser}>
//         <div className=" form-group">
//           <label htmlFor="Name">Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}

//             />
//           <small id="emailHelp" className="form-text text-muted">
//             We'll never share your email with anyone else.
//           </small>
//         </div>
//         <div className="form-group">
//           <label htmlFor="exampleInputEmail1">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}

//           />
//           <small id="emailHelp" className="form-text text-muted">
//             We'll never share your email with anyone else.
//           </small>
//         </div>
//         <div className="form-group">
//           <label htmlFor="exampleInputPassword1">Age</label>
//           <input
//             type="number"
//             className="form-control"
//             id="exampleInputPassword1"
//             placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}

//           />
//         </div>
//         <div className="form-check">
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="exampleCheck1"
//           ></input>
//           <label className="form-check-label" htmlFor="exampleCheck1">
//             Check me out  
//           </label>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;
