USE [sistemaEmpleados]
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Franco Rojas
-- Create date: 24/8/2024
-- Description:	SP que nos permite insertar un empleado en la tabla Empleado
-- =============================================
CREATE PROCEDURE [dbo].[InsertarEmpleado]
	@inNombre VARCHAR(64),
	@inSalario MONEY,
	@OutResultCode INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON
	BEGIN TRY

	SET @OutResultCode=0

	--Validamos si ya existe un elemento con el mismo nombre
	IF EXISTS (SELECT 1 FROM [sistemaEmpleados].[dbo].[Empleado] E WHERE E.Nombre=@inNombre)
	BEGIN
		SET @OutResultCode=50006 --Error, hay un empleado con el mismo nombre

	END

	IF (@OutResultCode=0)
	BEGIN
		INSERT INTO	[sistemaEmpleados].[dbo].[Empleado](Nombre, Salario)
		VALUES(@inNombre, @inSalario)
	END

	SELECT @OutResultCode AS OutResultCode

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

USE sistemaEmpleados
DECLARE @OutResultCode INT;
EXEC dbo.InsertarEmpleado 'Franco Rojas', 1000000, @OutResultCode OUTPUT

SELECT * FROM dbo.Empleado