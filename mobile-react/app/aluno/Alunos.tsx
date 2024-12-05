import { useEffect, useState } from "react";
import Search from "../../components/SearchAluno";
import { getAlunos } from "../../repository/alunos";
import { Aluno } from "../../types/Aluno";
import SearchAluno from "../../components/SearchAluno";

export default function Alunos() {
  const [alunos, setAluno] = useState<Aluno[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAlunos();
      setAluno(data);
    };

    fetchData();
  }, []);

  const handleDeleteAluno = (id: string) => {
    setAluno((prevAluno) => prevAluno.filter((aluno) => aluno.id !== id));
  };

  return (
    <div>
      <h1 className='text-indigo-950 text-2xl p-4 font-bold'>Aluno</h1>
      <SearchAluno posts={alunos}  onDelete={handleDeleteAluno} />
    </div>
  );
}
