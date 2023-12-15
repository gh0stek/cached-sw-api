import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { FilmModule } from './film/film.module'
import { SWApiModule } from './sw-api/sw-api.module'
import { PeopleModule } from './people/people.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      sortSchema: true,
      introspection: process.env.NODE_ENV !== 'production',
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    FilmModule,
    SWApiModule,
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
