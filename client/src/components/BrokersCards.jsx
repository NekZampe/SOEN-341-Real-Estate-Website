import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPerson, BsEnvelope, BsShield, BsTelephone, BsBuilding } from "react-icons/bs";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

const BrokerCards = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then((response) => {
                const brokerUsers = response.data.filter(user => user.u_type === "broker");
                setUsers(brokerUsers);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const userListStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
    };

    const userCardStyle = {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        width: "300px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f0f4f8",
    };

    const iconStyle = {
        display: "block",
        width: "24px",
        height: "24px",
        marginRight: "0.5rem",
    };

    const userInfoStyle = {
        display: "flex",
        alignItems: "center",
        margin: "0.25rem 0",
    };

    const userNameStyle = {
        textAlign: "center",
        fontSize: "1.2rem",
    };

    return (
        <div>
        <HeaderNav />
        <div style={userListStyle}>
            {users.map((user) => (
                <div style={userCardStyle} key={user.id}>
                    <BsPerson style={iconStyle} />
                    <h3 style={userNameStyle}>{user.name}</h3>
                    <p style={userInfoStyle}>
                        <BsEnvelope style={iconStyle} />
                        <span><strong>Email:</strong> {user.email}</span>
                    </p>
                    <p style={userInfoStyle}>
                        <BsShield style={iconStyle} />
                        <span><strong>License:</strong> {user.contact.authorization}</span>
                    </p>
                    <p style={userInfoStyle}>
                        <BsTelephone style={iconStyle} />
                        <span><strong>Phone:</strong> {user.contact.phone}</span>
                    </p>
                    <p style={userInfoStyle}>
                        <BsBuilding style={iconStyle} />
                        <span><strong>Company:</strong> {user.contact.company}</span>
                    </p>
                </div>
            ))}
        </div>
        <Footer/> 
        </div>
    );
};

export default BrokerCards;