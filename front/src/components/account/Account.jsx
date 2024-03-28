import Link from "next/link";
import react, { useState} from "react";

const Account = ()=>{

    const [showDropdown, setShowDropdown] = useState(false);

    const handleAccountClick = () => {
      setShowDropdown(!showDropdown);
    };
  
    const handleLogout = () => {
      // logout logic 
    };

    return(
      <div>
        <img src="#" alt="Account" onClick={handleAccountClick} />
        {showDropdown && (
          <div className="dropdown">
            <ul>
              <li>My Account</li>

              <li> 
                <Link href="/form">
                  Form
                </Link>
              </li>

              <li onClick={handleLogout}>Log Out</li>
            </ul>
          </div>
        )}
      </div>
    )
}

export default Account