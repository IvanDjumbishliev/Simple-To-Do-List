function NotFound() {
  const error = {
    status: 404,
    message: "Page not found",
    error: "Not Found"
  };

  return (
    <pre>
      {JSON.stringify(error, null, 2)}
    </pre>
  );
}

export default NotFound