#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Definindo tipos de dados para facilitar o código
typedef unsigned long long ull;  // Tipo para hash
typedef const char* String;      // Tipo para strings constantes

// Estrutura do bloco da blockchain
typedef struct Bloco {
    int id;                     // ID do bloco
    char material[50];         // Material associado ao bloco
    char origem[50];           // Origem do material
    char destino[50];          // Destino do material
    ull hashAtual;             // Hash atual do bloco
    ull hashAnterior;          // Hash do bloco anterior
    time_t datatime;           // Data e hora de criação do bloco
    struct Bloco* proximo;     // Ponteiro para o próximo bloco
} Sb;

// Função para calcular o hash baseado em uma string de entrada
ull CalculoHash(String entrada) {
    ull hash = 14695981039346656037ULL; // Valor inicial do hash
    for (size_t i = 0; i < strlen(entrada); i++) {
        hash ^= (unsigned char)entrada[i]; // XOR com cada caractere
        hash *= 1099511628211ULL;           // Multiplicação para aumentar a complexidade
    }
    return hash; // Retorna o hash calculado
}

// Função para criar um novo bloco
Sb* CriarBloco(int id, String material, String origem, String destino, ull hashAnterior) {
    Sb* novoBloco = (Sb*)malloc(sizeof(Sb)); // Aloca memória para o novo bloco
    if (novoBloco == NULL) {
        printf("Erro ao alocar memória para o bloco!\n");
        exit(1); // Sai do programa em caso de falha na alocação
    }
    
    // Atribui valores ao novo bloco
    novoBloco->id = id;
    strncpy(novoBloco->material, material, sizeof(novoBloco->material) - 1);
    novoBloco->material[sizeof(novoBloco->material) - 1] = '\0'; // Garante a terminação da string
    strncpy(novoBloco->origem, origem, sizeof(novoBloco->origem) - 1);
    novoBloco->origem[sizeof(novoBloco->origem) - 1] = '\0'; // Garante a terminação da string
    strncpy(novoBloco->destino, destino, sizeof(novoBloco->destino) - 1);
    novoBloco->destino[sizeof(novoBloco->destino) - 1] = '\0'; // Garante a terminação da string
    novoBloco->hashAnterior = hashAnterior; // Armazena o hash do bloco anterior
    novoBloco->datatime = time(NULL); // Obtém a data e hora atuais

    // Formata a entrada para o cálculo do hash
    char entrada[256];
    sprintf(entrada, "%d%s%s%s%llu%ld", novoBloco->id, novoBloco->material, novoBloco->origem, novoBloco->destino, hashAnterior, (long)novoBloco->datatime);

    novoBloco->hashAtual = CalculoHash(entrada); // Calcula o hash atual do bloco
    novoBloco->proximo = NULL; // Inicializa o ponteiro do próximo bloco como NULL

    return novoBloco; // Retorna o novo bloco criado
}

// Função para adicionar um bloco à blockchain
void adicionarBloco(Sb** blockchain, Sb* novoBloco) {
    Sb* temporario = *blockchain; // Ponto de partida para adicionar o bloco

    if (temporario == NULL) { // Se a blockchain está vazia
        *blockchain = novoBloco; // O novo bloco se torna o primeiro
    } else {
        // Percorre até o último bloco
        while (temporario->proximo != NULL) {
            temporario = temporario->proximo;
        }
        temporario->proximo = novoBloco; // Adiciona o novo bloco ao final
    }
}

// Função para exibir todos os blocos da blockchain
void exibirBlockchain(Sb* blockchain) {
    Sb* temporario = blockchain; // Começa do primeiro bloco

    // Percorre todos os blocos
    while (temporario != NULL) {
        printf("Bloco ID: %d\n", temporario->id);
        printf("Material: %s\n", temporario->material);
        printf("Origem: %s\n", temporario->origem);
        printf("Destino: %s\n", temporario->destino);
        printf("Hash Atual: %llx\n", temporario->hashAtual);
        printf("Hash Anterior: %llx\n", temporario->hashAnterior);
        printf("Data e Horário: %s\n", ctime(&temporario->datatime)); // Converte a data e hora para string
        printf("\n");

        temporario = temporario->proximo; // Passa para o próximo bloco
    }
}

// Função para consultar um bloco pela hash
void ConsultaHash(Sb* blockchain, char hashC[50]) {
    Sb* temporario = blockchain; // Começa do primeiro bloco
    ull hash = strtoull(hashC, NULL, 16); // Converte a hash de string para número
    int encontrado = 0; // Flag para indicar se o bloco foi encontrado

    // Percorre a blockchain para encontrar o bloco correspondente à hash
    while (temporario != NULL) {
        if (temporario->hashAtual == hash) { // Se a hash atual do bloco for igual à hash consultada
            printf("\nBloco correspondente\n\n");
            printf("Bloco ID: %d\n", temporario->id);
            printf("Material: %s\n", temporario->material);
            printf("Origem: %s\n", temporario->origem);
            printf("Destino: %s\n", temporario->destino);
            printf("Hash Atual: %llx\n", temporario->hashAtual);
            printf("Hash Anterior: %llx\n", temporario->hashAnterior);
            printf("Data e Horário: %s\n", ctime(&temporario->datatime)); // Exibe informações do bloco encontrado
            printf("\n");
            encontrado = 1; // Marca que o bloco foi encontrado
            break; // Interrompe o loop
        }
        temporario = temporario->proximo; // Move para o próximo bloco
    }

    if (!encontrado) { // Se não encontrou nenhum bloco
        printf("Hash não encontrada na blockchain.\n");
    }
}

// Função principal do programa
int main() {
    Sb* blockchain = NULL; // Inicializa a blockchain como vazia
    int opcao; // Variável para armazenar a opção do menu
    int id = 1; // ID do próximo bloco a ser adicionado
    char hashC[50]; // Variável para armazenar a hash consultada

    // Loop para exibir o menu e executar as opções
    do {
        printf("MENU:\n");
        printf("\n");
        printf("1. Adicionar Bloco\n");
        printf("2. Exibir Blockchain\n");
        printf("3. Consultar Hash\n");
        printf("4. Sair\n");
        printf("\n");
        printf("Escolha uma opção: ");
        scanf("%d", &opcao); // Lê a opção do usuário
        printf("\n");

        switch(opcao) {
            case 1: {
                char material[50], origem[50], destino[50]; // Variáveis para armazenar informações do novo bloco

                // Lê as informações do usuário
                printf("Informe o material: ");
                scanf("%s", material);
                printf("Informe a origem: ");
                scanf("%s", origem);
                printf("Informe o destino: ");
                scanf("%s", destino);

                // Cria um novo bloco e o adiciona à blockchain
                Sb* novoBloco = CriarBloco(id++, material, origem, destino, blockchain ? blockchain->hashAtual : 0);
                adicionarBloco(&blockchain, novoBloco);
                printf("Hash: %llx \n\n", novoBloco->hashAtual);
                printf("Bloco adicionado com sucesso!\n\n");
                break;
            }
            case 2:
                printf("======================================\n");
                printf("BLOCKCHAIN\n");
                printf("\n");
                exibirBlockchain(blockchain); // Exibe todos os blocos da blockchain
                printf("======================================\n");
                break;
            case 3:
                printf("--------------------------------------\n");
                printf("Digite a Hash: "); // Prompt para o usuário
                scanf("%s", hashC); // Lê a hash a ser consultada
                ConsultaHash(blockchain, hashC); // Faz a consulta na blockchain
                printf("--------------------------------------\n");
                break;

            case 4:
                printf("Saindo do programa.\n"); // Mensagem de saída
                break;
            default:
                printf("Opção inválida! Tente novamente.\n");
                printf("\n");
        }
    } while(opcao != 4); // Continua até que a opção 4 seja escolhida
    
    Sb* temporario;
    
    // Libera a memória de todos os blocos da blockchain
    while (blockchain != NULL) {
        temporario = blockchain; // Guarda o bloco atual
        blockchain = blockchain->proximo; // Move para o próximo bloco
        free(temporario); // Libera a memória do bloco atual
    }

    return 0; // Retorna 0 indicando que o programa terminou corretamente
}