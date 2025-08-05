
import { useNavigate } from 'react-router-dom';
import invoiceLogo from '../assets/invoice-logo.png'

const Header = () => {

  const navigate = useNavigate();


  return (
    <>
      <header className="relative overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-lg border-b-2 border-gray-200">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.2),transparent_50%)]"></div>
        </div>

        {/* Animated background particles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-2 left-10 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-4 right-20 w-0.5 h-0.5 bg-blue-500 rounded-full animate-ping opacity-30"></div>
          <div className="absolute bottom-2 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute bottom-3 right-1/3 w-0.5 h-0.5 bg-blue-600 rounded-full animate-ping opacity-25"></div>
        </div>

        <div className="relative flex items-center justify-center py-4 px-6">
          {/* Logo with glow effect */}
          <div className="relative flex items-center gap-3 group">
            {/* Logo container with hover effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-all duration-300 scale-150"></div>
              <div 
              onClick={() => navigate('/home')}
              className="relative bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <img
                  src={invoiceLogo}
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 relative z-10"
                  alt="logo"
                />
              </div>
            </div>

            {/* Title with enhanced styling */}
            <div className="relative">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent relative">
                Invoice Manager

                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 group-hover:w-full transition-all duration-500"></div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm">
                  Invoice Manager
                </div>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center opacity-80">
                Professional Invoice Management System
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-30"></div>
        </div>

        {/* Corner accent elements */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-blue-400 opacity-30"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400 opacity-30"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400 opacity-30"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blue-400 opacity-30"></div>

        {/* Floating light effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-blue-400/10 via-blue-500/5 to-transparent rounded-full animate-pulse pointer-events-none"></div>
      </header>
    </>
  )
}

export default Header