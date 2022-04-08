
#include "iostream"
using namespace std;

int main()
{
    int matriz[10][10];

    for(int i = 0; i < 10; i++)//Ciclo externo
    {
        //Notemos que en ciclo interno no usamos la variable 'i' sino 'j'
        //Si usaramos i, el comportamiento sería inesperado
        for(int j = 0; j < 10; j++)//Ciclo interno
        {
            //Llenamos la matríz con los números del 1 al 100
            matriz[i][j] = (i+1)*(j+1);
            //(i+1)*(j+1) va desde 1x1 hasta 10x10 (aunque en desorden)
        }
    }

    system("pause");
    return 0;
}