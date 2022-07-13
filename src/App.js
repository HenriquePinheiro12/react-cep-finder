import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import './app.css'

function App() {
  //viacep.com.br/ws/********/json/ 

  const [cepInfo, setCepInfo] = useState({})

  const fetchCEP = (cep) => 
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        
        
  const handleCLick = async () => {
    const json = await fetchCEP(input)
    console.log(json.erro)

    let { erro } = json

    if(erro) return setCepInfo({ erro })
    
     let { logradouro, bairro, 
      complemento, localidade, uf, cep} = json
     
     setCepInfo({
       logradouro, 
       bairro, 
       complemento, 
       localidade, 
       uf,
       cep,
     })
  }
    
  const [input, setInput] = useState('')
  const handleChange = value => setInput(value) 

  return (
    <div className="container">
      <h1 className="main-title">Buscador CEP</h1>

      <div className="container-input">
          <input
            onChange={e => handleChange(e.target.value)}
            className='cep-input'
            type="text"
            value={input}
            placeholder="Digite seu CEP"/>
          
          <button 
            className="search-btn"
            onClick={handleCLick}>
              <FaSearch color='grey' />
          </button>
      </div>
      {
        Object.keys(cepInfo).length === 0 ? null :
        Boolean('erro' in cepInfo) ? 
        (<main><h2>CEP Not found!</h2></main>) : 
        (<main>
            <h2>CEP: {cepInfo.cep}</h2>
            <ul className='cep-info-container'> 
              {
                Object.keys(cepInfo).map(key => {
                  return (
                    <li key={key} className='cep-info-item'>
                        <span className='info-key'>
                            {`${key}: `}
                        </span>
                        <span className='info-value'>
                            {cepInfo[key]}
                        </span>
                    </li>      
                  )
                })
              }
            </ul>
        </main>)
      }
    </div>
  );
}

export default App;
