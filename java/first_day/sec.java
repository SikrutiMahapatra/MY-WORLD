import java.util.Scanner;
public class sec {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter a number");
        int a = sc.nextInt();
        System.out.print("enter another number");
        int b = sc.nextInt();
        int c = a+b;
        System.out.print("sum ="+ c);
        sc.close();

    }
    
}
