import java.util.Scanner;
public class third {
    public static void main(String[] args){
        Scanner sc= new Scanner(System.in);
        System.out.print("enter your marks");
        int marks=sc.nextInt();
        if(marks>=90){
            System.out.print("your grade is O");

        }
        else if( marks<90 && marks>=80){
            System.out.print("your grade is E");
        }
        else if(marks<80 && marks>=70){
            System.out.print("your grade is A");
        }
        else if(marks<70 && marks>=60){
            System.out.print("your grade is B");
        }
        else{
           System.out.print("fail") ;
        }
        sc.close();
    }

    
}
