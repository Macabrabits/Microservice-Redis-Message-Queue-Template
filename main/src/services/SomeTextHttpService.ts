const axios = require('axios');

const baseUrl = "http://mshttp:3001"

const index = async (req: any) => {
  const data = req.query
  const config = {    
    url: `${baseUrl}/sometexts`,
    method: "GET",
    params: data,
  };
  console.log("http")
  return axios(config).then(res => res.data)  
  
  
}

const show = async (req: any) => {  
  const id = req.params.id
  const config = {    
    url: `${baseUrl}/sometexts/${id}`,
    method: "get",
    params: req.params
  };

  return axios(config).then(res => res.data); 
}

const save = async (req: any) => {
  const id = req.params.id ? `/${req.params.id   }` : ''
  const config = {
    url: `${baseUrl}/sometexts${id}`,
    method: "post",
    data: req.body,
    params: req.params,
  };

  return axios(config).then(res => res.data)  
};

const remove = async (req: any) => {
  const id = req.params.id
  const config = {
    url: `${baseUrl}/sometexts/${id}`,
    method: "delete",    
    params: req.params,
  };
    
  return axios(config).then(res => res.data); 
}

export default {
  index,
  show,
  save,
  remove,
};
