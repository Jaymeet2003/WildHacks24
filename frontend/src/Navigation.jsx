
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import avatar from './img/avatar.png'
import { signout } from './Icons'
import { menuItems } from './menuItems'

import PropTypes from 'prop-types';

function Navigation({ active, setActive }) {

    const [userData, setUserData] = useState({
        displayName: '', // Default empty string
        imageUrl: '', // Default empty string for the avatar image
    });

    const handleLogout = () =>{
        window.location.href = "http://localhost:3000/logout";
    };


    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const response = await fetch('http://localhost:3000/user-info', {
                method: 'GET',
                credentials: 'include', // Important for CORS and sending cookies
              });
              if (!response.ok) {
                throw new Error('Failed to fetch user data');
              }
              const data = await response.json();
              setUserData({ displayName: data.displayName, imageUrl: data.imageUrl }); // Update the state with fetched data
            } catch (error) {
              console.error('Error:', error);
            }
        };
        fetchUserData();
    },[]);
    
    return (
        <NavStyled>
            <div className="user-con">
                <img src={userData.imageUrl} alt="" />
                <div className="text">
                    <h2>{userData.displayName}</h2>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    {signout}  <SignoutButton onClick={handleLogout}>Logout</SignoutButton>
                </li>
            </div>
        </NavStyled>
    )
}
Navigation.propTypes = {
    active: PropTypes.number.isRequired,
    setActive: PropTypes.func.isRequired,
};
const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }
    .bottom-nav{
        li{
            display: grid;
            grid-template-columns: 95px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;


const SignoutButton = styled.button`

`;


export default Navigation