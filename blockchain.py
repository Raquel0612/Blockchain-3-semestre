import time
import datetime
import hashlib


class Bloco:
    def __init__(self, id, material, origem, destino, hash_anterior):
        self.id = id
        self.material = material
        self.origem = origem
        self.destino = destino
        self.hash_anterior = hash_anterior
        self.datatime = time.time()
        self.hash_atual = self.calcular_hash()
        self.proximo = None

    def calcular_hash(self):
        entrada = f"{self.id}{self.material}{self.origem}{self.destino}{self.hash_anterior}{int(self.datatime)}"
        return int(hashlib.sha256(entrada.encode()).hexdigest(), 16)

    def exibir(self):
        print(f"Bloco ID: {self.id}")
        print(f"Material: {self.material}")
        print(f"Origem: {self.origem}")
        print(f"Destino: {self.destino}")
        print(f"Hash Atual: {hex(self.hash_atual)}")
        print(f"Hash Anterior: {hex(self.hash_anterior)}")
        print(f"Data e Horário: {datetime.datetime.fromtimestamp(self.datatime).strftime('%d/%m/%Y %H:%M:%S')}\n")


class Blockchain:
    def __init__(self):
        self.cabeca = None  # Inicializa cabeca dentro do __init__

    def adicionar_bloco(self, bloco):
        if self.cabeca is None:
            self.cabeca = bloco
        else:
            atual = self.cabeca
            while atual.proximo:
                atual = atual.proximo
            atual.proximo = bloco

    def exibir_blockchain(self):
        atual = self.cabeca
        while atual:
            atual.exibir()
            atual = atual.proximo

    def consultar_hash(self, hash_str):
        try:
            hash_int = int(hash_str, 16)
        except ValueError:
            print("Hash inválida.")
            return

        atual = self.cabeca
        while atual:
            if atual.hash_atual == hash_int:
                print("\nBloco correspondente encontrado:\n")
                atual.exibir()
                return
            atual = atual.proximo
        print("Hash não encontrada na blockchain.\n")


def menu():
    blockchain = Blockchain()  # Aqui já inicializa o blockchain com a cabeca = None
    id_counter = 1

    while True:
        print("MENU:")
        print("1. Adicionar Bloco")
        print("2. Exibir Blockchain")
        print("3. Consultar Hash")
        print("4. Sair")
        opcao = input("Escolha uma opção: ")

        if opcao == '1':
            material = input("Informe o material: ")
            origem = input("Informe a origem: ")
            destino = input("Informe o destino: ")
            hash_anterior = blockchain.cabeca.hash_atual if blockchain.cabeca else 0
            novo_bloco = Bloco(id_counter, material, origem, destino, hash_anterior)
            blockchain.adicionar_bloco(novo_bloco)
            print(f"Hash: {hex(novo_bloco.hash_atual)}\n")
            print("Bloco adicionado com sucesso!\n")
            id_counter += 1

        elif opcao == '2':
            print("========== BLOCKCHAIN ==========")
            blockchain.exibir_blockchain()
            print("=================================\n")

        elif opcao == '3':
            hash_input = input("Digite a Hash: ")
            blockchain.consultar_hash(hash_input)

        elif opcao == '4':
            print("Saindo do programa.")
            break

        else:
            print("Opção inválida! Tente novamente.\n")


if __name__ == "__main__":
    menu()
