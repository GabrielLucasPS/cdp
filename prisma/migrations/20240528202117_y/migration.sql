-- AlterTable
CREATE SEQUENCE pedidos_numero_seq;
ALTER TABLE "Pedidos" ALTER COLUMN "numero" SET DEFAULT nextval('pedidos_numero_seq'),
ALTER COLUMN "pedidoSalvo" DROP NOT NULL;
ALTER SEQUENCE pedidos_numero_seq OWNED BY "Pedidos"."numero";
