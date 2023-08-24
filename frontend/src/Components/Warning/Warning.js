import './Warning.css'

function Warning({name,callback,closeWarning,action,id,user}) {

    function performTheAction(){
        if(!user){
            callback(id)
            closeWarning()
        }else{
            callback(user)
            closeWarning()
        }
    }
    
  return (
    <div className='warning'>
        <div className='boxWarning'>
            <p>Tem certeza que deseja {action}o usuário {name}?</p>
            <div className='buttonsWaring'>
                <button onClick={performTheAction}>Sim</button>
                <button onClick={closeWarning}>Não</button>
            </div>
        </div>
    </div>
  )
}

export default Warning