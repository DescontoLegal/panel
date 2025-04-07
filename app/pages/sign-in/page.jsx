'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../config/db/firebase'
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('É necessário inserir seu e-mail e senha para continuar.');
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        console.log({ res });
        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
        router.push('/');
      }
    } catch (e) {
      console.error(e);
      alert('Ocorreu um erro ao tentar entrar no Painel. Por favor, tente novamente!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-center">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="font-bold text-white text-2xl mb-5" style={{padding:'15px'}}>Entrar no Painel</h1>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          style={{padding:'15px'}}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          style={{padding:'15px'}}
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          disabled={loading}
          style={{padding:'15px'}}
        >
          {loading ? 'Entrando...' : 'Entrar no Painel'}
        </button>
        {error && <p className="text-red-500 mt-3" style={{padding:'15px'}}>{error.message} Seu usuário ou senha estão incorretos. Verifique os dados e tente novamente!</p>}
      </div>
    </div>
  );
};

export default SignIn;