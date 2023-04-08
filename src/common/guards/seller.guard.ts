import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { IncomingMessage } from "http";


@Injectable()
export class SellerGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean {
        const request = this.getRequest<
        IncomingMessage & { session?: Record<string, unknown> }
      >(context);
      try {
        const user = request.session?.user as any
        if(user?.role === "Seller"){
            return true;
        }
      return false
      } catch (e) {
        console.log(e)
        return false;
      }
    }

    protected getRequest<T>(context: ExecutionContext): T {
        return context.switchToHttp().getRequest();
      }
}