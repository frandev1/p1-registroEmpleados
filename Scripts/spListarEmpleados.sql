USE [sistemaEmpleados]

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Franco Rojas
-- Create date: 24/7/2024
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[ListarEmpleados]
	@OutResultCode INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
	-- se hacen declaraciones
	-- se hacen inicializacion
	SET @OutResultCode=0;

	-- se hacen validaciones
	-- Datasets se especifican al final y todos juntos
	--SELECT @OutResultCode AS OutResultCode;
	SELECT E.[id],
	E.[Nombre],
	E.[Salario]
	FROM [sistemaEmpleados].[dbo].[EMPLEADO] E;

	END TRY

	BEGIN CATCH
	INSERT INTO [dbo].[DBErrors] VALUES (
	SUSER_SNAME(),
	ERROR_NUMBER(),
	ERROR_STATE(),
	ERROR_SEVERITY(),
	ERROR_LINE(),
	ERROR_PROCEDURE(),
	ERROR_MESSAGE(),
	GETDATE()
	);

	SET @OutResultCode=50005 --Codigo de error standar del profe para informar de un error capturado en el catch
	END CATCH;

	SET NOCOUNT OFF;
END;
GO

DECLARE @OutResultCode INT
EXEC dbo.ListarEmpleados @OutResultCode OUTPUT
