import React from 'react';
import { useNavigate } from 'react-router-dom';

const buttonStyle = {
  flex: '1 1 200px',
  margin: '10px',
  padding: '15px 25px',
  fontSize: '1.1rem',
  fontWeight: '600',
  color: 'white',
  background: 'rgba(79, 70, 229, 0.8)',
  border: 'none',
  borderRadius: '12px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
};

const buttonHover = {
  background: 'rgba(99, 102, 241, 0.9)',
  boxShadow: '0 12px 40px 0 rgba(99, 102, 241, 0.6)',
  transform: 'scale(1.05)',
};

const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  padding: '20px',
};

function DeshBoard() {

  const [hovered, setHovered] = React.useState(null);
  const Navigate = useNavigate()

  const handleClick = () => {
    Navigate('/Qrcode')
  }

  const handleRazor = () => {
    Navigate('/RazorPay')
  }

  const handleButtonClick=()=>{
    Navigate("/AccountDetails")
  }

  return (
    <div style={containerStyle}>


      <button 
        style={hovered === 'transfer' ? { ...buttonStyle, ...buttonHover } : buttonStyle}
        onMouseEnter={() => setHovered('transfer')}
        onMouseLeave={() => setHovered(null)} 
        onClick={handleButtonClick}
      >

        <span>🏦</span> Bank to Bank Transfer
      </button>


      <button
        onClick={handleClick}
        style={hovered === 'upi' ? { ...buttonStyle, ...buttonHover } : buttonStyle}
        onMouseEnter={() => setHovered('upi')}
        onMouseLeave={() => setHovered(null)

        }
      >
        <span
        >📲</span> UPI Payment


      </button>


      {/* <button
      onClick={handleRazor}
        style={hovered === 'upi' ? { ...buttonStyle, ...buttonHover } : buttonStyle}
        onMouseEnter={() => setHovered('upi')}
       onMouseLeave={() => setHovered(null)

        }
      >
        <span
        >📲</span> RazorPayUPI Payment
     
     
      </button> */}


    </div>
  );
}

export default DeshBoard;
