const UpdateEvent = async (UpdatedEvent) => {
    var myHeaders = new Headers();
    myHeaders.append("api-key", "123456");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(UpdatedEvent);
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admin/events/editEvent`, requestOptions);
    const data = await response.json();
    // console.log("event update",data);
    return data;

}
export default UpdateEvent;