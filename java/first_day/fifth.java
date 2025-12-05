import java.util.Scanner;

public class fifth {
     public static void main(String[] args){
        Scanner sc= new Scanner(System.in);
        System.out.print("enter any number ");
        int random = sc.nextInt();
        int c=random;
        int pal=0;
        int rem=0;
        while(random!=0){
             rem=random%10;
             pal=(pal*10)+rem;
             random=random/10;

        }
        if(pal==c){
            System.out.println("palindrome");
        }
        else{
            System.out.println("nope");
        }
}
}