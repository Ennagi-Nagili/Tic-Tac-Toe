import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate();

    return(
        <div className="home">
            <div>
                <h1 className="header">Tic-Tac-Toe</h1>
                <div className="choices">
                    <h1 className="choice" onClick={() => navigate('/one')}>One Player</h1>
                    <h1 className="choice" onClick={() => navigate('/two')}>Two Player</h1>
                </div>
            </div>
        </div>
    )
}