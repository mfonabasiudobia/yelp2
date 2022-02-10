export const isUserLoggedIn = (gssp,redirect) => {
  
  return async (context) => {
    
    
    const {cookies} = context.req;
    const userData = cookies.userData

     if (userData != null) {
        if (JSON.parse(userData).status === true && JSON.parse(userData).data.active == 1) {
              
              return {
              redirect: {
                permanent: false,
                destination: redirect,
              },
              props: {},
           }
        }
      }


      return await gssp(context);


    }

  }




export const isUserNotLoggedIn = (gssp,redirect) => {
  
  return async (context) => {
    
    
    const {cookies} = context.req;
    const userData = cookies.userData

     if (userData != null) {
        if (JSON.parse(userData).status === true && JSON.parse(userData).data.active == 1) {
              return await gssp(context);
        }   
      }

      
      return {
              redirect: {
                permanent: false,
                destination: redirect,
              },
              props: {},
      }


    }

}



export const isAdminLoggedIn = (gssp,redirect) => {
  
  return async (context) => {
    
    
    const {cookies} = context.req;
    const adminData = cookies.adminData

     if (adminData != null) {
        if (JSON.parse(adminData).status === true) {
              
              return {
              redirect: {
                permanent: false,
                destination: redirect,
              },
              props: {},
           }
        }
      }


      return await gssp(context);


    }

  }



export const isAdminNotLoggedIn = (gssp,redirect) => {
  
  return async (context) => {
    
    
    const {cookies} = context.req;
    const adminData = cookies.adminData

     if (adminData != null) {
        if (JSON.parse(adminData).status === true) {
              return await gssp(context);
        }   
      }

      
      return {
              redirect: {
                permanent: false,
                destination: redirect,
              },
              props: {},
      }


    }

}


