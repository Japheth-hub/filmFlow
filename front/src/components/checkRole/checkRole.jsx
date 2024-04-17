'use client'
import { useRouter } from "next/navigation";
import './cRole.css'
import Button from "../button/Button";


const CheckRole = ({ userRole, requiredRoles, children }) => {
  const router = useRouter()
  if (!requiredRoles.includes(userRole)) {
    return (
      <div className="checkRole">
        <span className='crying'>😢</span>

        <p className="noAccess">No cuentas con la autorización suficiente </p>
        <p className="noAccess">Regresa al home haciendo clic aquí.. </p>
        <Button label={'Regresar'} callback={() => router.push('/')} />
    </div>
    );
  }
  return children;
};

export default CheckRole;
