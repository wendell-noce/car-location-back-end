import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;
}
export const env: Env = plainToInstance(Env, {
  jwtSecret: "string"
});

const errors = validateSync(env);

if (errors.length > 0) {
  const messages = errors.map(err => {
    const constraints = Object.values(err.constraints || {});
    return `${err.property}: ${constraints.join(', ')}`;
  }).join('\n');
  throw new Error(`Erro nas variáveis de ambiente:\n${messages}`);
}
