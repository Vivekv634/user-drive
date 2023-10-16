import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [first, setFirst] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5500/api/user/getData');
            setFirst(response.data);
            console.log(response.data);
        }
        fetchData();
    }, []);
    return (
        <>
            {first}
        </>
    )
}
