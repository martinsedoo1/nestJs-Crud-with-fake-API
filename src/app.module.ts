import { Module, HttpModule } from '@nestjs/common';
import { PostsController } from 'controllers/posts/posts.controller';
import { PostsService } from 'services/posts/posts.service';

@Module({
  imports: [HttpModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class AppModule {}
