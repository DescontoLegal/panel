"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Databases, Storage, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67f324670002c627faaa");

const databases = new Databases(client);
const storage = new Storage(client);

export default function AddPartnerPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      let fileId = null;

      if (file) {
        const uploadedFile = await storage.createFile(
          "67f33dfe0033ef6a197e",
          ID.unique(),
          file
        );
        fileId = uploadedFile.$id;
      }

      await databases.createDocument(
        "67f33041001a16b903ec",
        "partners",
        ID.unique(),
        {
          name,
          cnpj,
          address,
          district,
          city,
          state,
          phone,
          email,
          discount,
          fileId,
          createdAt: new Date().toISOString(),
        }
      );

      setSuccessMessage("Parceiro cadastrado com sucesso!");

      // Resetar campos
      setName("");
      setCnpj("");
      setAddress("");
      setDistrict("");
      setCity("");
      setState("");
      setPhone("");
      setEmail("");
      setDiscount("");
      setFile(null);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao adicionar parceiro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <div className="header">
        <h2>Cadastrar Parceiro</h2>
      </div>
      <p>
        Preencha o formulário abaixo para cadastrar um parceiro do Cartão
        Desconto Legal:
      </p>

      <div className="form-container mt-8 w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
        {successMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "30px", padding: "30px" }}
        >
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              CPF/CNPJ
            </label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              Endereço
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              Bairro
            </label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              Cidade
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              Estado
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              Telefone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              Desconto (%)
            </label>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ paddingBottom: "5px" }}
            >
              Imagem do Parceiro
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-900 transition"
            style={{ padding: "15px" }}
          >
            {loading ? "Salvando..." : "Cadastrar Parceiro"}
          </button>
        </form>
      </div>
    </div>
  );
}
