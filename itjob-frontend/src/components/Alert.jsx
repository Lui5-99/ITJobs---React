const Alert = ({ alert }) => {
  return (
    <div className={`alert ${alert.error ? "alert-error" : "alert-success"}`}>
      {alert.msg}
    </div>
  );
};

export default Alert;
