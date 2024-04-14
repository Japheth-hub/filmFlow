import Link from "next/link";
import './cRole.css'

const CheckRole = ({ userRole, requiredRoles, children }) => {
  if (!requiredRoles.includes(userRole)) {
    return (
      <div className="checkRole">
        <span className='crying'>😢</span>

        <p className="noAccess">No cuentas con la autorización suficiente </p>
        
        <Link href="/">
          Volver al inicio
        </Link>
    </div>
    );
  }
  return children;
};

export default CheckRole;
