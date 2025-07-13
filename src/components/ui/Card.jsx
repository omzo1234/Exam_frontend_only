const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${
        hoverEffect ? 'transition-transform duration-300 hover:shadow-lg hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;