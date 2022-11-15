exports.get404 = (req, res, next) => {
    const error = new Error('Not found.');
    error.statusCode = 404;
    next(error);
  };
  
  exports.get500 = (error, req, res, next) => {
    //accedemos a los datos del error
    const data = error.data;
  
    //devolvemos un estado
    res.status(error.statusCode || 500);
    //devolvemos la respuesta en json
    res.json({
      error: {
        message: error.message,
        data: data,
      },
    });
  };
  