"use client";

import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67f324670002c627faaa");

const databases = new Databases(client);

export default function ListPartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await databases.listDocuments(
          "67f33041001a16b903ec",
          "partners"
        );
        setPartners(response.documents);
      } catch (error) {
        console.error("Erro ao buscar parceiros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const handleDelete = async (partnerId) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar este parceiro?"
    );
    if (!confirmDelete) return;

    try {
      await databases.deleteDocument(
        "67f33041001a16b903ec",
        "partners",
        partnerId
      );

      setPartners(partners.filter((partner) => partner.$id !== partnerId));
    } catch (error) {
      console.error("Erro ao deletar parceiro:", error);
      alert("Erro ao deletar parceiro. Veja o console.");
    }
  };

  const handleEdit = (partnerId) => {
    alert(`Função de edição para o parceiro ID: ${partnerId}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="content mb-6">
          <div className="header mb-2">
            <h2>Lista de Parceiros</h2>
          </div>
          <p style={{ marginBottom: '20px', fontSize: '16px', color: '#333' }}>
            Confira abaixo todos os parceiros cadastrados no Cartão Desconto
            Legal:
          </p>

          {loading ? (
            <p>Carregando parceiros...</p>
          ) : partners.length === 0 ? (
            <p>Nenhum parceiro cadastrado ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-left text-sm">
                    <th className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Nome</th>
                    <th className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Telefone</th>
                    <th className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Email</th>
                    <th className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Desconto</th>
                    <th className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((partner) => (
                    <tr key={partner.$id} className="border-b text-sm">
                      <td className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>{partner.name}</td>
                      <td className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>{partner.phone}</td>
                      <td className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>{partner.email}</td>
                      <td className="py-2 px-4" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>{partner.discount}%</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() => handleEdit(partner.$id)}
                          className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-900 transition" style={{ paddingTop: '5px', paddingBottom: '5px', paddingLeft: '20px', paddingRight: '20px'}}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(partner.$id)}
                          className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition" style={{ paddingTop: '5px', paddingBottom: '5px', paddingLeft: '20px', paddingRight: '20px', marginLeft: '10px'}}
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
