// supabase.js
// Importa o cliente Supabase via CDN (usado no HTML como módulo ES)

// Substitua os valores abaixo pelas suas credenciais do Supabase
// Em produção na Vercel, essas variáveis são configuradas no painel deles
const SUPABASE_URL = "https://bcqoplezvrkyoshcnpdx.supabase.co";
const SUPABASE_KEY = "sb_publishable_hyCA66BcjVEqOEl6Kcl8eQ_QELCOJ2w";

// Importação dinâmica do SDK do Supabase via CDN
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Exporta o cliente para ser usado nos outros arquivos
export const supabase = createClient("https://bcqoplezvrkyoshcnpdx.supabase.co", "sb_publishable_hyCA66BcjVEqOEl6Kcl8eQ_QELCOJ2w");